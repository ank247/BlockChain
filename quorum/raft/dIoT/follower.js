

from .voter import Voter


class Follower(Voter):

    function __init__(this, timeout=500)
    {
        Voter.__init__(this);
        this._timeout = timeout;
        this._timeoutTime = this._nextTimeout();
    }

    function on_append_entries(this, message)
    {
        this._timeoutTime = this._nextTimeout();

        if(message.term < this._server._currentTerm)
	  {
            this._send_response_message(message, yes=False);
            return this, None;
          }

        if(message.data != {})
	  {
            log = this._server._log;
            data = message.data

            # Check if the leader is too far ahead in the log.
            if(data["leaderCommit"] = this._server._commitIndex)
	    {
                # If the leader is too far ahead then we
                #   use the length of the log - 1
                this._server._commitIndex = min(data["leaderCommit"],
                                                len(log) - 1);
            }
            # Can't possibly be up-to-date with the log
            # If the log is smaller than the preLogIndex
            if(len(log) < data["prevLogIndex"])
	    {
                self._send_response_message(message, yes=False);
                return this, None;
            }  
            # We need to hold the induction proof of the algorithm here.
            #   So, we make sure that the prevLogIndex term is always
            #   equal to the server.
            if(len(log) > 0 and
               log[data["prevLogIndex"]]["term"] != data["prevLogTerm"])
            { 
                # There is a conflict we need to resync so delete everything
                #   from this prevLogIndex and forward and send a failure
                #   to the server.
                log = log[:data["prevLogIndex"]];
                this._send_response_message(message, yes=False);
                this._server._log = log;
                this._server._lastLogIndex = data["prevLogIndex"];
                this._server._lastLogTerm = data["prevLogTerm"];
                return this, None;
            }
            # The induction proof held so lets check if the commitIndex
            #   value is the same as the one on the leader
            else
	    {
                # Make sure that leaderCommit is > 0 and that the
                #   data is different here
                if(len(log) > 0 and
                   data["leaderCommit"] > 0 and
                   log[data["leaderCommit"]]["term"] != message.term)
		{
                    # Data was found to be different so we fix that
                    #   by taking the current log and slicing it to the
                    #   leaderCommit + 1 range then setting the last
                    #   value to the commitValue
                    log = log[:this._server._commitIndex];
                    for e in data["entries"]
		    {	
                        log.append(e);
                        this._server._commitIndex += 1;
                    }
                    this._send_response_message(message);
                    this._server._lastLogIndex = len(log) - 1;
                    this._server._lastLogTerm = log[-1]["term"];
                    this._commitIndex = len(log) - 1;
                    this._server._log = log;
	        }		
                else
		{    
                    # The commit index is not out of the range of the log
                    #   so we can just append it to the log now.
                    #   commitIndex = len(log)
                    #   Is this a heartbeat?
                    if(len(data["entries"]) > 0)
		     {	
                        for e in data["entries"]
			{     
                            log.append(e);
                            this._server._commitIndex += 1;
                        }  
                        this._server._lastLogIndex = len(log) - 1;
                        this._server._lastLogTerm = log[-1]["term"];
                        this._commitIndex = len(log) - 1;
                        this._server._log = log;
                        this._send_response_message(message);
                     }
                }			
            this._send_response_message(message);
            return this, None;		
          }
         else
         {
            return this, None;
         } 
     }
