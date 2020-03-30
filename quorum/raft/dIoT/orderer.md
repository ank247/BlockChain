
Leader:

1. send heart beats: send server current terms
2. on response receive: 
   1. logIndex of the node increase by 1
   2. on failure of message reponse: 
      1. next index of message.sender=next.indexes[msg.sender]-1
      2. self._server.currentTerm(logEntries)
    else:
      1. self._nextIndexes[msg.sender]+=1
      2. self._nextIndexes[msg.sender]=self._server._lastLogIndex[msg.sender]
3. set_server():server+:+port

Candidate:

1. self._server_set(), self._start_election(), self._votes={}
2. def on_vote_received():
      if votes.key()>(self._server._total_nodes-1)/2:
         leader=Leader()
3. def _start_election():
       election=RequestVoteMessage(
                        self._server._name,  
                        {
                          self._server._lastLogIndex,
                          self._server._lastLogTerm,
                        })
        
       self._server.send_message(election)
       self._last_vote=self._server._name

Follower:

1. self._timeout=timeout, self_nextTimeOut=nextTimeout()
2. def on_append_entries():
       1.msg.term>self._server._currentTerm
       2. on msg.data!={}
          1. log=self._server.log
          
          2. data=msg.data
          
          3. data['leaderCommit']!=self._server._commitIndex
             1.self._server._commitIndex = min(data["leaderCommit"],len(log) - 1)

          4. len(log)>data["prevLogIndex"]
          
          5. if(len(log) > 0 and log[data["prevLogIndex"]]["term"] != data["prevLogTerm"]):
          
                log = log[:data["prevLogIndex"]]

          6. else:
          7. 
                 if(len(log) > 0 and data["leaderCommit"] > 0 and 
                    log[data["leaderCommit"]]["term"] != message.term):
                   
                    log = log[:self._server._commitIndex]
                    
                    log.append(e)
                    
STATES(Client):

1. message.term > self._server._currentTerm
2. 
