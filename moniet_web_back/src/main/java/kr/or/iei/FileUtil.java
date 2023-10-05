package kr.or.iei;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileUtil {

	public String getFilepath(String savepath, String filename, MultipartFile uploadFile) {
		// filename -> test.txt
		// test            .txt
		String onlyFilename = filename.substring(0, filename.lastIndexOf(".")); // test
		String extention = filename.substring(filename.lastIndexOf(".")); // .txt
		// 실제업로드 할 파일명을 저장할 변수
		String filepath = null;
		// 파일명 중복되면 뒤에 붙일 숫자
		int count = 0;
		while(true) {
			if(count == 0) {
				filepath = onlyFilename+extention; // filename
			}else {
				filepath = onlyFilename+"_"+count+extention; // filename
			}
			// C:/Temp/upload/notice/+filepath
			File checkFile = new File(savepath+filepath);
			if(!checkFile.exists()) {
				try {
					uploadFile.transferTo(checkFile);
				} catch (IllegalStateException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				break;
			}
			count++;
		}
		return filepath;
	}
	
}
