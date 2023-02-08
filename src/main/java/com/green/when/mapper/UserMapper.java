package com.green.when.mapper;


import com.green.when.vo.MemberResponseVo;
import com.green.when.vo.MemberVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

//기존 DaoImpl 대신 mapper와 다이렉트 연결
@Repository
@Mapper
public interface UserMapper {

    //회원가입
    void signup(MemberVo memberVo);

    // 회원가입시 아이디 중복 확인
    boolean userCheck(String userid);

    // 내 정보 불러오기
    Optional<MemberVo> findByUserid(String userid);

    // 닉네임 변경
    void changeUserNickname(MemberVo memberVo);

    //비밀번호 변경
    void changeUserPw(MemberVo memberVo);

    // ID 중복체크
    int useridCheck(String userid);

    // 아이디 찾기
    String findId(String useremail);

    // 임시비밀번호 설정
    void updatePassword(HashMap map);

    // 임시비밀번호 보낼 회원 이메일 확인
    String findUseremail(String userid);

    // 프로필 이미지 불러오기
    MemberVo callProfileImg(String userid);

    //프로필 이미지 등록
    void profileImgUpload(MemberVo memberVo);

    // 회원 목록 불러오기
    List<MemberResponseVo> userList();

    // 회원 탈퇴
    void userDelete(MemberVo memberVo);

    // 탈퇴된 회원테이블로 탈퇴회원 정보에 입력
    void deleteUserInsert(MemberVo memberVo);

    // 회원탈퇴시 외래키 해제
    void foreignKeyChecks();

    // 회원탈퇴시 외래키 재설정
    void foreignKeyCheck();

    // 탈퇴유저중 중복된 아이디 체크
    int deleteUserCheck(String userid);

    // 탈퇴유저중 이메일 중복체크
    int deleteEmailCheck(String useremail);

    // 신규유저 이메일 중복체크
    int newEmailCheck(String useremail);

    // 탈퇴유저중 닉네임 중복체크
    int deleteNickname(String usernickname);

    // 신규유저 닉네임 중복체크
    int newNickname(String usernickname);

    // 회원등급 변경
    void roleChange(MemberVo memberVo);

}
