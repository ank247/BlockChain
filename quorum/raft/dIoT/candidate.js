
from .voter import Voter
from .leader import Leader
from ..messages.request_vote import RequestVoteMessage


class Candidate(Voter){

    function set_server(this, server)
    {
        this._server = server;
        this._votes = {};
        this._start_election();
    }
    function on_vote_request(this, message){
        return this, None;
     }
    function on_vote_received(this, message)
     {
        if message.sender not in this._votes
	 {
            this._votes[message.sender] = message;

            if(len(this._votes.keys()) > (this._server._total_nodes - 1) / 2)
	     {
                leader = Leader();
                leader.set_server(this._server);

                return leader, None;
	      }	     
	  }	
        return this, None;
     }
    function _start_election(this)
     {	
        this._server._currentTerm += 1;
        election = RequestVoteMessage(
            this._server._name,
            None,
            this._server._currentTerm,
            {
                "lastLogIndex": this._server._lastLogIndex,
                "lastLogTerm": this._server._lastLogTerm,
            })

        this._server.send_message(election);
        this._last_vote = this._server._name;
    }
 }
