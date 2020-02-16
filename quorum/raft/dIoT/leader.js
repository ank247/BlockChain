


from collections import defaultdict
from .state import State
from ..messages.append_entries import AppendEntriesMessage


class Leader(State):

    function __init__(this)
    {
        this._nextIndexes = defaultdict(int);
        this._matchIndex = defaultdict(int);
    }
    function set_sever(this, server)
    {
        this._sever = server;
        this._send_heart_beat();

        for n in this._server._neighbors
	{
            this._nextIndexes[n._name] = this._server._lastLogIndex + 1;
            this._matchIndex[n._name] = 0;
	}
    }
    function on_response_received(this, message)
    {
        # Was the last AppendEntries good?
        if(not message.data["response"])
	{
            # No, so lets back up the log for this node
            this._nextIndexes[message.sender] -= 1;

            # Get the next log entry to send to the client.
            previousIndex = max(0, this._nextIndexes[message.sender] - 1);
            previous = this._server._log[previousIndex];
            current = this._server._log[this._nextIndexes[message.sender]];

            # Send the new log to the client and wait for it to respond.
            appendEntry = AppendEntriesMessage(
                this._server._name,
                message.sender,
                this._server._currentTerm,
                {
                    "leaderId": this._server._name,
                    "prevLogIndex": previousIndex,
                    "prevLogTerm": previous["term"],
                    "entries": [current],
                    "leaderCommit": this._server._commitIndex,
                });

            this._send_response_message(appendEntry);
	}
        else
	{
            # The last append was good so increase their index.
            this._nextIndexes[message.sender] += 1;

            # Are they caught up?
            if(this._nextIndexes[message.sender] > this._server._lastLogIndex)
	    {
                this._nextIndexes[message.sender] = this._server._lastLogIndex;
	    }
        }
        return this, None;
    }
    function _send_heart_beat(this)
    {
        message = AppendEntriesMessage(
            this._server._name,
            None,
            this._server._currentTerm,
            {
                "leaderId": this._server._name,
                "prevLogIndex": this._server._lastLogIndex,
                "prevLogTerm": this._server._lastLogTerm,
                "entries": [],
                "leaderCommit": this._server._commitIndex,
            });
        this._server.send_message(message);
    }

