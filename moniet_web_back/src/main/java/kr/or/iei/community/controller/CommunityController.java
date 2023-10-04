package kr.or.iei.community.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.community.model.service.CommunityService;

@RestController
@RequestMapping(value="/community")
public class CommunityController {
	
	@Autowired
	private CommunityService communityService;
	
	@GetMapping(value="/list/{reqPage}")
	public List list(@PathVariable int reqPage) {
		List list = communityService.communityList(reqPage);
		return list;
	}

}
