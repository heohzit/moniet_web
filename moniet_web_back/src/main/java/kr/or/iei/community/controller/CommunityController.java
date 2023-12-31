package kr.or.iei.community.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.iei.FileUtil;
import kr.or.iei.community.model.service.CommunityService;
import kr.or.iei.community.model.vo.Community;
import kr.or.iei.community.model.vo.Community2;
import kr.or.iei.community.model.vo.CommunityBoard;
import kr.or.iei.community.model.vo.CommunityBoardFile;
import kr.or.iei.community.model.vo.CommunityBoardType;
import kr.or.iei.community.model.vo.CommunityType;
import kr.or.iei.community.model.vo.ComuBoardComment;

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
	public List list(@PathVariable int reqPage, @RequestAttribute String memberId) {
		List list = communityService.communityList(reqPage, memberId);
		System.out.println("controller list : "+list);
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
	public Community view(@PathVariable int communityNo, @RequestAttribute String memberId) {
		Community c = communityService.selectOneCommunity(communityNo, memberId);
		return c;
	}
	
//	@GetMapping(value="/delete/{communityNo}")
//	public int deleteCommunity(@PathVariable int communityNo) {
//		List<CommunityType> typeList = communityService.delete(communityNo);
//	}
	
	@GetMapping(value="/communityBoardList/{reqPage}/{communityNo}")
	public List communityBoardList(@PathVariable int reqPage, @PathVariable int communityNo, @RequestAttribute String memberId) {
		List list = communityService.communityBoardList(reqPage, communityNo, memberId);
		return list;
	}
	
	@PostMapping(value="/insertBoard")
	public int insertBoard(@ModelAttribute CommunityBoard c,
							@ModelAttribute MultipartFile[] boardFile,
							@RequestAttribute String memberId) {
		c.setMemberId(memberId);
		
		String savepath = root+"community/";
		
		// 썸네일이 없으니 썸네일 부분 생략
		
		ArrayList<CommunityBoardFile> fileList = new ArrayList<CommunityBoardFile>();
		
		if (boardFile != null) {
			for (MultipartFile file : boardFile) {
				String filename = file.getOriginalFilename();
				String filepath = fileUtil.getFilepath(savepath, filename, file);
				CommunityBoardFile cbf = new CommunityBoardFile();
				cbf.setFilename(filename);
				cbf.setFilepath(filepath);
				fileList.add(cbf);
			}
		}
		
		int result = communityService.insertBoard(c, fileList);
		
		return result;
	}
	
	@GetMapping(value="/boardCommentList/{reqPage}/{communityBoardNo}")
	public List boardCommentList(@PathVariable int reqPage, @PathVariable int communityBoardNo) {
		List list = communityService.boardCommentList(reqPage, communityBoardNo);
		return list;
	}
	
	@PostMapping(value="/insertBoardComment")
	public int insertBoardComment(@ModelAttribute ComuBoardComment c,
									@RequestAttribute String memberId) {
		c.setMemberId(memberId);
		
		int result = communityService.insertBoardComment(c);
		return result;
	}
	
	@GetMapping(value="/recommentList/{reqPage}/{communityBoardNo}/{comuBoardCommentNo}")
	public List recommentList(@PathVariable int reqPage, @PathVariable int communityBoardNo, @PathVariable int comuBoardCommentNo) {
		
		ComuBoardComment cbc = new ComuBoardComment();
		cbc.setComuBoardCommentRef(comuBoardCommentNo);
		cbc.setComuBoardRef(communityBoardNo);
		
		List list = communityService.recommentList(cbc);
		
		return list;
	}
	
	@ResponseBody
	@GetMapping(value="/boardLike/{communityBoardNo}")
	public int boardLike (@ModelAttribute CommunityBoard c ,@RequestAttribute String memberId ,int communityBoardNo) {
		c.setMemberId(memberId);
		int likeCount = communityService.boardlike(c, communityBoardNo);
		return likeCount;
	}
	
	@GetMapping(value="/removeComment/{comuBoardCommentNo}")
	public int removeComment(@PathVariable int comuBoardCommentNo) {
		int result = communityService.removeComment(comuBoardCommentNo);
		return result;
	}
	
	@GetMapping(value="/deleteBoard/{communityBoardNo}")
	public int deleteBoard(@PathVariable int communityBoardNo) {
		List<CommunityBoardFile> fileList = communityService.delete(communityBoardNo);
		if(fileList != null) {
			String savepath = root+"community/";
			for(CommunityBoardFile boardFile : fileList) {
				File file = new File(savepath+boardFile.getFilepath());
				file.delete();
			}
			return 1;
		} else {
			return 0;
		}
	}
	
	@GetMapping(value="/insertCommunityLike/{communityNo}")
	public int insertCommunityLike(@PathVariable int communityNo, @RequestAttribute String memberId) {
		int result = communityService.insertCommunityLike(communityNo, memberId);
		return result;
	}
	
	@GetMapping(value="/removeCommunityLike/{communityNo}")
	public int removeCommunityLike(@PathVariable int communityNo, @RequestAttribute String memberId) {
		int result = communityService.removeCommunityLike(communityNo, memberId);
		return result;
	}
	
	@GetMapping(value="/insertBoardLike/{communityBoardNo}")
	public int insertBoardLike(@PathVariable int communityBoardNo, @RequestAttribute String memberId) {
		int result = communityService.insertBoardLike(communityBoardNo, memberId);
		return result;
	}
	
	@GetMapping(value="/removeBoardLike/{communityBoardNo}")
	public int removeBoardLike(@PathVariable int communityBoardNo, @RequestAttribute String memberId) {
		int result = communityService.removeBoardLike(communityBoardNo, memberId);
		return result;
	}
	
	@GetMapping(value="/deleteCommunity/{communityNo}")
	public int deleteCommunity(@PathVariable int communityNo) {
		int result = communityService.deleteCommunity(communityNo);
		return result;
	}
	
	@PostMapping(value="/modifyCommunity")
	public int modifyCommunity(@ModelAttribute Community c, @ModelAttribute MultipartFile thumbnail, String communityType) {
		if (c.getCommunityThumb() == null) {
			c.setCommunityThumb(null);
		}
		
		String savepath = root+"community/";
		
		if (thumbnail != null) {
			String filepath = fileUtil.getFilepath(savepath, thumbnail.getOriginalFilename(), thumbnail);
			c.setCommunityThumb(filepath);
		}
		
		int result = communityService.modifyCommunity(c, communityType);
		return result;
	
	}
	

	

	@GetMapping(value="/insertParti/{communityNo}")
	public int insertParti(@PathVariable int communityNo, @RequestAttribute String memberId) {
		int result = communityService.insertParti(communityNo, memberId);
		return result;
	}
	
	@GetMapping(value="/outParti/{communityNo}")
	public int outParti(@PathVariable int communityNo, @RequestAttribute String memberId) {
		int result = communityService.outParti(communityNo, memberId);
		return result;
	}
	
	@GetMapping(value="/searchCoummunity/{searchType}/{searchValue}")
	public List searchCoummunity(@PathVariable int searchType, @PathVariable String searchValue) {
		List list = communityService.searchCoummunity(searchType, searchValue);
		return list;
	}
	
	@PostMapping(value="/modifyBoard")
	public int modifyBoard(@ModelAttribute CommunityBoard c, @ModelAttribute MultipartFile[] boardFile) {
		System.out.println("컨트롤에서 커뮤니티보드 :"+c);
		System.out.println("컨트롤에서 업로드할 파일 : "+boardFile);
		
		String savepath = root+"community/";
		
		ArrayList<CommunityBoardFile> fileList = new ArrayList<CommunityBoardFile>();
		
		if (boardFile != null) {
			for (MultipartFile file : boardFile) {
				String filename = file.getOriginalFilename();
				String filepath = fileUtil.getFilepath(savepath, filename, file);
				CommunityBoardFile cbf = new CommunityBoardFile();
				cbf.setFilename(filename);
				cbf.setFilepath(filepath);
				fileList.add(cbf);
			}
		}
		
		int result = communityService.modifyBoard(c, fileList);
		return result;
	}
	
	@GetMapping(value="/myCommunityList")
	public List myCommunityList(@RequestAttribute String memberId) {
		List list = communityService.myCommunityList(memberId);
		return list;
	}
	
	@GetMapping(value="/myPartiCommunityList")
	public List myPartiCommunityList(@RequestAttribute String memberId) {
		List list = communityService.myPartiCommunityList(memberId);
		return list;
	}
	
	@GetMapping(value="/likeCommunityList")
	public List likeCommunityList(@RequestAttribute String memberId) {
		List list = communityService.likeCommunityList(memberId);
		return list;
	}
	
	//관리자 
	@GetMapping(value="/allCommunityList/{reqPage}")
	public Map allCommunityList(@PathVariable int reqPage) {
		Map map = communityService.allCommunityList(reqPage);
		return map;
	}


	//체크된 데이터 지우기
	@PostMapping(value="/checkDelete")
		public String checkDelete(@RequestBody Community2 community) {
			System.out.println(community);
			String communityNumber = community.getCommunityNo();
			boolean result = communityService.checkDelete(communityNumber);
			return communityNumber;
	}
	
	//인기커뮤니티
	@PostMapping(value="/firstCommunity")
	public Community firstCommunity() {
		Community c = communityService.firstCommunity();
		return c;		
	}
}



