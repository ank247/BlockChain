

from .state import State

from ..messages.request_vote import RequestVoteResponseMessage

export default class Voter(State)
{  
    this._last_vote = None
    function on_vote_request(this, message)
    {
        if(this._last_vote is None and
           message.data["lastLogIndex"] >= this._server._lastLogIndex)
	{
            this._last_vote = message.sender;
            this._send_vote_response_message(message);
	}
        else
	{
            this._send_vote_response_message(message, yes=False);
        }
        return this, None;
    }
   	
    function _send_vote_response_message(this, msg, yes=True)
    {
        voteResponse = RequestVoteResponseMessage(
            this._server._name,
            msg.sender,
            msg.term,
            {"response": yes})
        this._server.send_message_response(voteResponse);                                        
    }
}        



