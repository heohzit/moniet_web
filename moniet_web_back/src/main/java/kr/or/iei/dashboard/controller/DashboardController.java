package kr.or.iei.dashboard.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.cashbook.model.service.CashbookService;
import kr.or.iei.cashbook.model.vo.Cashbook;
import kr.or.iei.cashbook.model.vo.Category;

@RestController
@RequestMapping(value="dashboard")
public class DashboardController {
	@Autowired
	private CashbookService cashbookService;
	
	//파이대시보드
	@PostMapping (value="/pie")
	public List pieDash(@RequestAttribute String memberId) {
		return cashbookService.pieDash(memberId);
	}
	
	//바 대시보드
	@PostMapping (value="/bar")
	public Map barDash (@RequestAttribute String memberId) {
		List<Category> barList = cashbookService.barDash(memberId);
		List incomeBar = new ArrayList<Category>();
		List spendingBar = new ArrayList<Category>();
		for(Category c : barList) {
			if(c.getCategoryRef() == 1) {
				incomeBar.add(c);
			} else if(c.getCategoryRef()==2) {
				spendingBar.add(c);
			}
			System.out.println(incomeBar);
		}
		Map map = new HashMap<String, Object>();
		map.put("incomeBar", incomeBar);
		map.put("spendingBar",spendingBar);
		return map;
	}
	
	//라인 대시보드
	@PostMapping (value="/line")
	public Map lineDash (@RequestAttribute String memberId) {
		List<Category> lineList = cashbookService.lineDash(memberId);
		List incomeLine = new ArrayList<Category>();
		List spendingLine = new ArrayList<Category>();
		for(Category c : lineList) {
			if(c.getCategoryRef() == 1) {
				incomeLine.add(c);
			} else if(c.getCategoryRef()==2) {
				spendingLine.add(c);
			}
			System.out.println(incomeLine);
		}
		Map map = new HashMap<String, Object>();
		map.put("incomeLine", incomeLine);
		map.put("spendingLine",spendingLine);
		return map;
	}
}
