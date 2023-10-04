package kr.or.iei.challenge.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.challenge.model.service.ChallengeService;
import kr.or.iei.challenge.model.vo.Challenge;

@RestController
@RequestMapping(value="challenge")
public class ChallengeController {
	@Autowired
	private ChallengeService challengeService;
	
	//챌린지 목록
	@GetMapping(value="/challengeList1")
	public Map challengeList1 () {
		Map map =challengeService.challengeList1();
		return map;
	}
	
	//챌린지 목록
	@GetMapping(value="/challengeList2")
	public Map challengeList2 () {
		Map map =challengeService.challengeList2();
		return map;
	}
	
	//챌린지 상세보기
	@GetMapping(value="/view/{challengeNo}")
	public Challenge view(@PathVariable int challengeNo) {
		return challengeService.selectOneChallenge(challengeNo);
	}
	
	//챌린지 만들기
	@PostMapping(value="/insert")
	public int insertChallenge (@RequestBody Challenge c) {
		int result = challengeService.insertChallenge(c);
		return result;
	}
	
}
