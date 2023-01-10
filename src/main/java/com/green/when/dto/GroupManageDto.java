package com.green.when.dto;


import com.green.when.domain.GroupManageEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class GroupManageDto {

    private Long no;

    private String userid;

    private String groupname;

    private LocalDateTime time;

    private Long grade;

    public GroupManageDto (GroupManageEntity groupManageEntity){
        this.no = groupManageEntity.getNo();
        this.userid = groupManageEntity.getUserid();
        this.groupname = groupManageEntity.getGroupname();
        this.time = groupManageEntity.getTime();
        this.grade = groupManageEntity.getGrade();
    }
}
