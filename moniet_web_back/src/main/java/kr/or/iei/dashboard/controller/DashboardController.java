package kr.or.iei.dashboard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.cashbook.model.service.CashbookService;

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
}
