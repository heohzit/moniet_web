package kr.or.iei.community.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.iei.FileUtil;
import kr.or.iei.community.model.service.CommunityService;
import kr.or.iei.community.model.vo.Community;
import kr.or.iei.community.model.vo.CommunityType;

@RestController
@RequestMapping(value="/community")
public class CommunityController {
	
	@Autowired
	private CommunityService communityService;
	
	@Autowired
	private FileUtil fileUtil;
	
	@Value("${file.root}")
	private String root;
	
	@GetMapping(value="/list/{reqPage}")
	public List list(@PathVariable int reqPage) {
		List list = communityService.communityList(reqPage);
		return list;
	}
	
	@PostMapping(value="/contentImg")
	public String contentImg(@ModelAttribute MultipartFile image) {
		String savepath = root+"community/editor/";
		String filename = image.getOriginalFilename();
		String filepath = fileUtil.getFilepath(savepath, filename, image);
		return "/community/editor/"+filepath;
	}
	
	@PostMapping(value="/insert")
	public int insertCommunity(@ModelAttribute Community c, @ModelAttribute MultipartFile thumbnail, String communityType, @RequestAttribute String memberId) {
		c.setMemberId(memberId);
		
		String savepath = root+"community/";
		
		if(thumbnail != null) {
			String filename = thumbnail.getOriginalFilename();
			String filepath = fileUtil.getFilepath(savepath, filename, thumbnail);
			c.setCommunityThumb(filepath);
		}
		
		ArrayList<CommunityType> typeList = new ArrayList<CommunityType>();
		
		System.out.println(c);
		System.out.println(thumbnail);
		System.out.println(communityType);
		System.out.println(memberId);
		
		return 1;
	}

}
