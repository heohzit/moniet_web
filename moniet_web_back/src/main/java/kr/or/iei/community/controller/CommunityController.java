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
		System.out.println("최초 넘어온 커뮤니티타입 : "+communityType);
		
		c.setMemberId(memberId);
		
		String savepath = root+"community/";
		
		if(thumbnail != null) {
			String filename = thumbnail.getOriginalFilename();
			String filepath = fileUtil.getFilepath(savepath, filename, thumbnail);
			c.setCommunityThumb(filepath);
		}
		
		int result = communityService.insertCommunity(c, communityType);
		
		return result;
//		ArrayList<CommunityType> typeList = new ArrayList<CommunityType>();
		
//		System.out.println(c);
//		System.out.println(thumbnail);
//		System.out.println(communityType);
//		System.out.println(memberId);
		
//		String[] arr = communityType.split("/");
//		
//		int[] typeArr = new int[arr.length];
//		for (int i = 0; i < arr.length; i++) {
//			System.out.println("스플릿 이후 : "+arr[i]);
//			System.out.println("자료형 : "+arr.getClass().getName());
//			typeArr[i] = Integer.parseInt(arr[i]);
//			System.out.println("자료형 변환 이후 : "+typeArr[i]);
//			System.out.println("자료형 : "+typeArr.getClass().getName());
//			System.out.println(typeArr[0].getClass()); 자료형 getClass 확인하는 함수
//		}
//		
//		for (int i = 0; i < typeArr.length; i++) {
//			System.out.println(typeArr[i]);
//		}
		
//		int result = communityService.insertCommunity(c,typeArr);
	}

	@GetMapping(value="/view/{communityNo}")
	public Community view(@PathVariable int communityNo) {
		return communityService.selectOneCommunity(communityNo);
	}
	
//	@GetMapping(value="/delete/{communityNo}")
//	public int deleteCommunity(@PathVariable int communityNo) {
//		List<CommunityType> typeList = communityService.delete(communityNo);
//	}
	
	@GetMapping(value="/communityBoardList/{reqPage}/{communityNo}")
	public List communityBoardList(@PathVariable int reqPage, @PathVariable int communityNo) {
		List list = communityService.communityBoardList(reqPage, communityNo);
		return list;
	}
	
}
