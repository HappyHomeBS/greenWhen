package com.green.when.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Table (name = "groupmanage_tb")
@NoArgsConstructor
@ToString
public class GroupManageEntity {


    @Id
    @GeneratedValue
    private Long no;

    @Column(name = "userid", nullable = false)
    private String userid;

    @Column(name = "groupname", nullable = false)
    private String groupname;

    @Column(name = "time", nullable = false)
    private LocalDateTime time;

    @Column(name = "grade", nullable = false)
    private Long grade;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "groupname", referencedColumnName = "groupname", insertable = false, updatable = false)
    private GroupEntity groupEntity;

    public GroupManageEntity(Long no, String userid, String groupname,
                             LocalDateTime time, Long grade) {
        this.no = no;
        this.userid = userid;
        this.groupname = groupname;
        this.time = time;
        this.grade = grade;
    }

}
