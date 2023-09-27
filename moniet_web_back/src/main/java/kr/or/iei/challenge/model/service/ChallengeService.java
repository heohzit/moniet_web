package kr.or.iei.challenge.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.challenge.model.dao.ChallengeDao;

@Service
public class ChallengeService {
	@Autowired
	private ChallengeDao challengeDao;
}
