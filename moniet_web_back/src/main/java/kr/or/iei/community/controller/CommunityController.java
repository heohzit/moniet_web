package kr.or.iei.community.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.iei.FileUtil;
import kr.or.iei.community.model.service.CommunityService;

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

}
