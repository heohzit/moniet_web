package kr.or.iei.cashbook.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.cashbook.model.service.CashbookService;
import kr.or.iei.cashbook.model.vo.Cashbook;
import kr.or.iei.cashbook.model.vo.Category;
import kr.or.iei.challenge.model.service.ChallengeService;

@RestController
@RequestMapping(value="/cashbook")
public class CashbookController {

	@Autowired
	private CashbookService cashbookService;
	@Autowired
	private ChallengeService challengeService;
	
	@PostMapping(value="/list")
	public Map cashbookList(@RequestBody Cashbook cashbook, @RequestAttribute String memberId) {
		cashbook.setMemberId(memberId);
		List cashbookList = cashbookService.cashbookList(cashbook);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("cashbookList", cashbookList);
		return map;
	}
	
	@PostMapping(value="/total")
	public Map cashbookSum(@RequestBody Cashbook cashbook, @RequestAttribute String memberId) {
		cashbook.setMemberId(memberId);
		Map map = cashbookService.sumOfCashbook(cashbook);
		return map;
	}
	
	@PostMapping(value="/categoryList")
	public Map categoryList(@RequestAttribute String memberId) {
		System.out.println("카테고리:"+memberId);
		List<Category> categoryList = cashbookService.categoryList(memberId);
		System.out.println(categoryList);
		List incomeCategory = new ArrayList<Category>();
		List spendingCategory = new ArrayList<Category>();
		List challengeCategory = challengeService.challengeListsByMember(memberId);
		
		//ref 1:수입, 2:지출
		for(Category c : categoryList) {
			if(c.getCategoryRef() == 1) {
				incomeCategory.add(c);
			} else if(c.getCategoryRef()==2) {
				spendingCategory.add(c);
			}
		}
		Map map = new HashMap<String, Object>();
		map.put("incomeCategory", incomeCategory);
		map.put("spendingCategory", spendingCategory);
		map.put("challengeCategory", challengeCategory);
		return map;
	}
	
	@PostMapping(value="/insert")
	public int insertCashbook(@RequestBody Cashbook cashbook, @RequestAttribute String memberId) {
		cashbook.setMemberId(memberId);
		return cashbookService.insertCashbook(cashbook);
	}
	
	@PostMapping(value="/delete")
	public boolean deleteCashbook(@RequestBody String cashbookNos, @RequestAttribute String memberId) {
		String cashbookNoArr = cashbookNos.replace("=", "");
		System.out.println("cashbookNos : " + cashbookNos);
		System.out.println("cashbookNoArr : " + cashbookNoArr);
		boolean result = cashbookService.deleteCashbook(cashbookNoArr, memberId);
		return result;
	}
}
