package com.green.when.dto;


import com.green.when.domain.GroupEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.swing.text.html.parser.Entity;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class GroupDto {

    private String groupname;

    private String groupleader;

    private String descript;

    private LocalDateTime time;

    public GroupDto(GroupEntity groupEntity){
        this.groupname = groupEntity.getGroupname();
        this.groupleader = groupEntity.getGroupleader();
        this.descript = groupEntity.getDescript();
        this.time = groupEntity.getTime();
    }
}
