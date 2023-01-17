package com.green.when.controller;



import com.green.when.domain.GroupManageEntity;
import com.green.when.domain.NoteEntity;
import com.green.when.dto.dtos.GroupManageDto;
import com.green.when.dto.dtos.MemberAndGroupJoinDto;
import com.green.when.dto.dtos.NoteDto;
import com.green.when.service.GroupManageService;
import com.green.when.service.MemverService;
import com.green.when.service.NoteService;
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
public class GroupManageController {

    private final GroupManageService groupManageService;

    private final MemverService memverService;

    private final NoteService noteService;

    //send invite message


    //마음에 들었었는데 ->     @Query("SELECT g.groupname, g.grade, m.userid, m.usernickname FROM GroupManageEntity g JOIN g.memberEntity m WHERE g.groupname = :groupname")
    //    List<MemberAndGroupJoinDto> findByGroupname(@Param("groupname") String groupname);
    @GetMapping("/api/member-list/{groupname}")
    public WrapperClass get_all_members(@PathVariable("groupname") String groupname){

        List<MemberAndGroupJoinDto> lists = groupManageService.findByGroupName(groupname);


        return new WrapperClass(lists);
    }


    //kick out
    @DeleteMapping("/api/manage/kick-out/{userid}/{groupname}")
    public ResponseEntity delete_user_from_group(@PathVariable String userid,
                                                 @PathVariable String groupname){
        HttpHeaders headers = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        HttpStatus status = HttpStatus.NO_CONTENT; // 잘 됐따 보낼게 없다. 204
        try{
            GroupManageEntity groupManage = groupManageService.findit(userid, groupname); // 이거 찾아서
            groupManageService.delete(groupManage);   // 지워
        } catch (Exception exception){
            status = HttpStatus.BAD_REQUEST;
            System.out.println("delete_board/exception = " + exception);
        }
        return new ResponseEntity(body, headers, status);
    }


    //관리자의 게시글 대량 삭제 -> board테이블거라 거기 api로 가겠음
    //change-leader ::테이블 상 group_tb가 어울리므로 groupcontroller에서 진행


    @PostMapping("/api/invite")
    public ResponseEntity invitiation(@RequestBody NoteDto noteDto){
        NoteEntity note = new NoteEntity(noteDto);
        System.out.println("노트좀 보여줘 " + note);
        noteService.save(note);

        return ResponseEntity.ok().build();
    }


    @GetMapping("/api/note-list-mypage/{recept}")
    public WrapperClass note_list_mypage(@PathVariable("recept") String recept){

        System.out.println("?????????"+ recept);

        List<NoteEntity> noteList = noteService.findThem(recept, true);

        System.out.println("??????/" + recept+"....."+ noteList );
        List<NoteDto> noteDtos = noteList.stream().map(n ->
                new NoteDto(n)).collect(Collectors.toList());

        for (NoteDto noteDto : noteDtos) {

            System.out.println("note??????????" + noteDto);

        }

        return new WrapperClass(noteDtos);
    }


    @PostMapping("/api/accepted/")
    public ResponseEntity new_user_in_group(@RequestBody GroupManageDto groupManageDto){
        try {
            String deny = groupManageDto.getDeny();
            System.out.println("deny?  : " + deny);
            System.out.println("deny?확인용dto  : " + groupManageDto);

            if(deny.equals("yes")) {
                GroupManageEntity groupManageEntity = new GroupManageEntity(groupManageDto);
                System.out.println("초대받은사람 ! " + groupManageEntity);
                groupManageService.save(groupManageEntity);
                System.out.println("pathcariable? " + deny);
            }


            System.out.println("pathcariable?" + deny);
            //이번엔 노트db에서 삭제
            String content = groupManageDto.getGroupname();
            System.out.println("노트db에서 삭제. content = " + content);
            NoteEntity note = noteService.findOne(content, true);
            System.out.println("노트db에서 삭제. note = " + note);
            noteService.delete(note);



        }catch (Exception err) {
            System.out.println(" accepted err : " +err);
        }

        return  ResponseEntity.ok().build();

    }
/*
    @DeleteMapping("/api/Invitation-Deny/{content}")
    public ResponseEntity deny_invitation(@PathVariable("countent") String content){
        //content, invitation true 찾아내서
        try{
        NoteEntity note = noteService.findOne(content, true);
        System.out.println("invitation/deny/note/" + note);
        //삭제
        noteService.delete(note);} catch (Exception err){
            System.out.println("invitation-deny-err:" + err);
        }

        return ResponseEntity.ok().build();
    }
*/
}
