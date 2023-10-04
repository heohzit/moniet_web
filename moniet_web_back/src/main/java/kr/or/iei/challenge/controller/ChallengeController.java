package kr.or.iei.challenge.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.challenge.model.service.ChallengeService;
import kr.or.iei.challenge.model.vo.Challenge;

@RestController
@RequestMapping(value="challenge")
public class ChallengeController {
	@Autowired
	private ChallengeService challengeService;
	
	//챌린지목록
	@GetMapping(value="/challengeList")
	public Map challengeList () {
		Map map =challengeService.challengeList();
		return map;
	}
	
	//챌린지 상세보기
	@GetMapping(value="/view/{challengeNo}")
	public Challenge view(@PathVariable int challengeNo) {
		return challengeService.selectOneChallenge(challengeNo);
	}
}
