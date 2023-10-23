package kr.or.iei;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import kr.or.iei.challenge.model.service.ChallengeService;

@Component

public class Scheduler {
		@Autowired
		private ChallengeService challengeService;

		@Scheduled(cron = "0 0 0 * * *")	// 매일 00시 정각
		public void challengeFinish() { 
			challengeService.challengeFinish();	
		}

}
