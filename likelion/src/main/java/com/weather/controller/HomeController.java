package com.weather.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
public class HomeController {
    
    private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

    // @GetMapping("/") *문자 리턴 (뷰jsp)
    // @ResponseBody *데이터 리턴 (데이터)

    @GetMapping("/detail-user")
    @ResponseBody   
    public String detailUser(@RequestParam(value = "uid") String id, Model model) {

        // DB에서 받아온 데이터
        String name = "김철수";
        String nickname = "코딩1234";

        model.addAttribute("name", name);
        model.addAttribute("nick", nickname);

        return "detail-user";
    }

    @GetMapping("/getUser/{a}")
    @ResponseBody
    public String getUser(@PathVariable("a") int a) {

        // 상품의 상세정보 보여줄 때 많이 씀
        System.out.println("a : " + a);

        return "ok";
    }

    @GetMapping("/saveUser")
    @ResponseBody
    public String saveUser(@RequestParam(value = "uid") String id, @RequestParam(value = "upw") String pw) {

        // 회원가입 로직..

        System.out.println("id : " + id);
        System.out.println("password : " + pw);

        return "ok";
    }

    @GetMapping("/")
    public String home() {

        return "home";
    }
}   