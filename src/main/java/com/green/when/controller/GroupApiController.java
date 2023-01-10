package com.green.when.controller;


import com.green.when.domain.GroupEntity;
import com.green.when.domain.GroupManageEntity;
import com.green.when.dto.GroupDto;
import com.green.when.dto.GroupManageDto;
import com.green.when.service.GroupManageService;
import com.green.when.service.GroupService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class GroupApiController {


    private final GroupService groupService;

    private final GroupManageService groupManageService;

    //CREATE NOW GROUP
    @PostMapping("/api/creat-group")
    public ResponseEntity create_group(@RequestBody GroupDto groupDto){
        System.out.println("time to making for new group");
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.CREATED; // 201 = WELL DONE
        try{
            GroupEntity group = new GroupEntity(groupDto);
            groupService.create(group);


        }catch (Exception exception){
            status = HttpStatus.BAD_REQUEST;
            System.out.println("소모임생성 실패 예외 : " + exception);
        }

    return new ResponseEntity(body, headers, status);

    }

    //LIST OF GROUP YOU ARE JOINED


//       *******에러***** 해당 서비스->리파지토리보면 그룹메니지엔티티 쓴다고 말해놨기에 여기서 사용 불가
    @GetMapping("/api/group-list/{userid}")
    public WrapperClass group_list(@PathVariable("userid") String userid){
        //group_tb 말고 groupmanage_tb에서 userid로 검색
        // 결과값 groupname 을 가져온다 group_tb로하면
        // member tb 거쳐서 외래키 사용해야 하니까 한번에 그냥 찾겠음
        System.out.println("1. 그룹 리스트 찾으러 옴.");
        System.out.println("2. userid :"+ userid);


        List<GroupManageEntity> listForGroup = groupManageService.findByUserid(userid);
        List<GroupManageDto> listForGroupDTO = listForGroup.stream().map(b ->
                new GroupManageDto(b)).collect(Collectors.toList());
        //
        // warning!!!!! group_tb이 아니라 groupManage_tb이용했음
        //

        System.out.println("3. 그래서 찾은건? List");

        return  new WrapperClass(listForGroupDTO);

    }


    //UPDATE PART. MAYBE NAME OF GROUP? IF YOU ARE THE ONE WHO HAV MADE IT
    //NOTICE!!!!!!!!!!!!!!!!!!!YOU SHOULD GET NOT ONLY GROUPBTE BUT ALSO OLDGOURPNAME
    //WHEN YOU USE UPDATE-GROUPNAME AND UPDATE-GROUPDESCRIPT FUNCTION!!!!!!
    @PostMapping("/api/update-group")
    public ResponseEntity update_group(@RequestBody GroupDto groupDto,
                                       @RequestParam String oldGroupName){
        System.out.println("어ㅠ휴");
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.NO_CONTENT; // 보낼 내용이 없다 수정 잘 댓다  204 -> 수정이 정상적으로 완료됬음을 의미
        try{
            groupService.update(groupDto.getGroupname(),
                    groupDto.getDescript(), oldGroupName);
            // 여기서 리더 바꿀수도 잇긴함.
        }catch (Exception exception){
            status = HttpStatus.BAD_REQUEST; // 400 에러
            System.out.println("update_group/exception = " + exception);
        }
        return new ResponseEntity(body, headers, status);
    }

    //onetomany 해줘야함
    @DeleteMapping("/api/delete-group")
    public ResponseEntity delete_group(@RequestBody GroupDto groupDto){
        System.out.println("delete_group = ");
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.NO_CONTENT; // 잘 됐따 보낼게 없다. 204
        try {
            GroupEntity group = groupService.findOne(groupDto.getGroupname());
            groupService.delete(group);
        }catch (Exception exception){
            status = HttpStatus.BAD_REQUEST;
            System.out.println("delete_group/exception = " + exception);

        }
        return new ResponseEntity(body, headers, status);

    }





    //DELETE PART. IF YOU ARE THE OWNER.



}
