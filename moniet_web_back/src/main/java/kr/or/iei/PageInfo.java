package kr.or.iei;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PageInfo {
	private int start;
	private int end;
	private int pageNo;
	private int pageNaviSize;
	private int totalPage;
}
