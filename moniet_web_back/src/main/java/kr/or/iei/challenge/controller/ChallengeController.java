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
	@PostMapping(value="/challengeList1")
	public Map challengeList1 (@RequestAttribute String memberId) {
		Map map =challengeService.challengeList1(memberId);
		return map;
	}
	
	//챌린지 목록(종료)
	@PostMapping(value="/challengeList2")
	public Map challengeList2 (@RequestAttribute String memberId) {
		Map map =challengeService.challengeList2(memberId);
		return map;
	}
	
	//챌린지 상세보기
	@PostMapping(value="/view/{challengeNo}")
	public Challenge view(@PathVariable int challengeNo,@RequestAttribute String memberId) {
		return challengeService.selectOneChallenge(challengeNo,memberId);
	}
	
	//챌린지 상세보기(저축)
	@PostMapping(value="/view2/{challengeNo}")
	public Challenge view2(@PathVariable int challengeNo,@RequestAttribute String memberId) {
		return challengeService.selectOneChallenge2(challengeNo,memberId);
	}
	
	//챌린지 만들기
	@PostMapping(value="/insert")
	public int insertChallenge (@RequestBody Challenge c,@RequestAttribute String memberId) {
		c.setMemberId(memberId);
		int result = challengeService.insertChallenge(c);
		return result;
	}
	
	//챌린지 삭제
	@GetMapping(value="/delete/{challengeNo}")
	public int deleteChallenge (@PathVariable int challengeNo) {
		int result = challengeService.deleteChallenge(challengeNo);
		return result;
	}
	
	//챌린지 포기
	@PostMapping (value="/changeChallenge")
	public int changeChallenge (@RequestBody Challenge c,@RequestAttribute String memberId) {
		return challengeService.changeChallenge(c,memberId);
	}
	
	//챌린지 레벨 조회
	@PostMapping (value="/challengeLevel")
	public int challengeLevel(@RequestAttribute String memberId) {
		int challenge=challengeService.challengeLevel(memberId);
		System.out.println("챌린지레벨"+challenge);
		return challenge;
	}
	
}
