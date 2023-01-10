
package com.green.when.service;


import com.green.when.domain.GroupManageEntity;
import com.green.when.repositories.GroupManageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional( readOnly = true )
public class GroupManageService {

    private final GroupManageRepository groupManageRepository;

    public List<GroupManageEntity> findByUserid(String userid) {

        return groupManageRepository.findByUserid(userid);

    }

}
