package kr.or.iei;

import org.springframework.stereotype.Component;

@Component
public class Pagination {
	public PageInfo getPageInfo(int reqPage, int numPerPage, int pageNaviSize, int totalCount) {
		int end = reqPage*numPerPage;
		int start = end-numPerPage+1;
		int totalPage = (int)Math.ceil(totalCount/(double)numPerPage);
		int pageNo =  ((reqPage-1)/pageNaviSize)*pageNaviSize+1;
		PageInfo pi = new PageInfo(start, end,pageNo,pageNaviSize,totalPage);
		return pi;
	}
}
