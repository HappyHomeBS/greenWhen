package com.green.when.controller;

import com.green.when.dto.MemberRequestDto;
import com.green.when.dto.MemberResponseDto;
import com.green.when.dto.TokenDto;
import com.green.when.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;


    @PostMapping("/signup")
    public void signup(@RequestBody MemberRequestDto requestDto) {
        authService.signup(requestDto);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto requestDto) {
        System.out.println(requestDto.toString());
        return ResponseEntity.ok(authService.login(requestDto));
    }

    @RequestMapping("/signupup")
    public ModelAndView signup() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("signupup");
        return mv;
    }

    @RequestMapping("/signinin")
    public ModelAndView signin() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("signinin");
        return mv;
    }
}