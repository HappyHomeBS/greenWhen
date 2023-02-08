package com.green.when.controller;

import com.green.when.config.SecurityUtil;
import com.green.when.service.InquiryService;
import com.green.when.vo.InquiryVo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")

public class InquiryController {
    //토큰에서 가져온 로그인 사용자 정보
    public InquiryVo setUserInfo() {
        String userId = SecurityUtil.getCurrentMemberId();
        String userRole = inquiryService.getUserRole(userId);

        InquiryVo userInfo = new InquiryVo();
        userInfo.setUserId(userId);
        userInfo.setUserRole(userRole);

        return userInfo;
    }
    @Autowired
    InquiryService inquiryService;
    //리스트 조회, 사용자 권한 확인 후  vo에 id와 함께 전달
    @GetMapping("/inquiryList")
    public ResponseEntity<Map> inquiryList(){
        InquiryVo inquiryVo = setUserInfo();

        List<InquiryVo>inquiryList = inquiryService.inquiryList(inquiryVo);

        Map result = new HashMap<>();
        result.put ("inquiryList", inquiryList);

        System.out.println(result);

        return ResponseEntity.ok(result);
    }
    //상세보기
    @GetMapping("/inquiryRead")
    public ResponseEntity<Map> inquiryRead(@RequestParam int no){
        InquiryVo inquiryVo = setUserInfo();
        inquiryVo.setNo(no);

        List<InquiryVo> inquiryRead = inquiryService.inquiryRead(inquiryVo);

        Map result = new HashMap<>();
        result.put("inquiryRead", inquiryRead);

        System.out.println(result);
        return ResponseEntity.ok(result);
    }

    // 1:1문의 쓰기 + 댓글달기 ( 클라이언트에서 전달받은 원글번호(grpNo) 값의 유무로 답글/원글 판단)
    @PostMapping("/inquiryWrite")
    public ResponseEntity<Map> inquiryWrite(@RequestBody InquiryVo inquiryVo){
        String userId = SecurityUtil.getCurrentMemberId();
        String userRole = inquiryService.getUserRole(userId);
        inquiryVo.setUserId(userId);
        inquiryVo.setUserRole(userRole);

        if (inquiryVo.getGrpNo()==0) {
            System.out.println("writeVo" + inquiryVo);
            inquiryService.inquiryWrite(inquiryVo);
        } else {
            System.out.println("replyVo" + inquiryVo);
            inquiryService.inquiryReply(inquiryVo);
        }

        Map result = new HashMap<>();
        System.out.println(result);
        return ResponseEntity.ok(result);
    }

    //삭제
    @GetMapping("/inquiryDelete")
    public ResponseEntity<Map> inquiryDelete(@RequestParam int no){

        //글 작성자
        InquiryVo targetArticle = inquiryService.setArticle(no);
        String articleWriter = targetArticle.getUserId();
        System.out.println("ta"+articleWriter);

        //로그인 사용자
        InquiryVo userInfo = setUserInfo();
        System.out.println("loginuser"+userInfo.getUserId());

        String msg = null;

        //사용자 검증 :  글 작성자이거나 admin 권한 일 때 삭제
        if (Objects.equals(articleWriter, userInfo.getUserId()) |
                Objects.equals(userInfo.getUserRole(), "ROLE_ADMIN")){

            inquiryService.inquiryDelete(no);
            msg = "삭제성공!";
        }

        else {
            msg = "권한이 없습니다!";
        }

        Map result = new HashMap<>();
        result.put("msg", msg);
        System.out.println(result);
        return  ResponseEntity.ok(result);
    }

    //수정하기
    @PostMapping("/inquiryUpdate")
    public ResponseEntity<Map> inquiryUpdate(@RequestBody InquiryVo inquiryVo){

        String articleWriter = inquiryVo.getUserId();

        //로그인 사용자
        InquiryVo userInfo = setUserInfo();
        System.out.println("loginuser"+userInfo.getUserId());

        String msg = null;

        if(Objects.equals(articleWriter, userInfo.getUserId())
                | Objects.equals(userInfo.getUserRole(), "ROLE_ADMIN")) {
            System.out.println(inquiryVo);
            inquiryService.inquiryUpdate(inquiryVo);
            msg = "수정완료!";
        }else{
            msg = "권한이 없습니다!";
        }


        Map result = new HashMap<>();
        result.put("msg", msg);
        return ResponseEntity.ok(result);
    }
}
