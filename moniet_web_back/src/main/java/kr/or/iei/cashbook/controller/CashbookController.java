package kr.or.iei.cashbook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.cashbook.model.service.CashbookService;

@RestController
@RequestMapping(value="/cashbook")
public class CashbookController {

	@Autowired
	private CashbookService cashbookService;
	
	@GetMapping(value="/list")
	public List cashbookList() {
		List cashbookList = cashbookService.cashbookList();
		return cashbookList;
	}
}
