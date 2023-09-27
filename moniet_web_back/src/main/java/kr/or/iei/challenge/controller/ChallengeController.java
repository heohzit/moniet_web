package kr.or.iei.challenge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import kr.or.iei.challenge.model.service.ChallengeService;

@Controller
public class ChallengeController {
	@Autowired
	private ChallengeService challengeService;
}
