package com.example.bugtrackersecuritybasicauth.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.bugtrackersecuritybasicauth.dto.BugResponseDTO;
import com.example.bugtrackersecuritybasicauth.dto.MetaData;
import com.example.bugtrackersecuritybasicauth.entity.Bug;
import com.example.bugtrackersecuritybasicauth.repository.BugRepository;

@Service
public class BugService {
     
     private final BugRepository bugRepository;
     
     public BugService(BugRepository bugRepository){
        this.bugRepository = bugRepository;
     }
    
     public List<BugResponseDTO> getAllBugs(){
        return bugRepository.findAll().stream()
        .map(bug -> new BugResponseDTO(bug.getId(), bug.getTitle(), bug.getAssignee(), bug.getStatus(), bug.getProject()))
        .collect(Collectors.toList());
     }
     
     public List<BugResponseDTO> filterByStatus(String status){
        return bugRepository.findAll().stream()
        .filter(bug -> bug.getStatus() != null && bug.getStatus().equalsIgnoreCase(status))
        .map(bug -> new BugResponseDTO(bug.getId(), bug.getTitle(), bug.getAssignee(), bug.getStatus(), bug.getProject()))
        .collect(Collectors.toList());
     }
     
     public List<BugResponseDTO> filterByAssignee(String assignee){
        return bugRepository.findAll().stream()
        .filter(bug -> bug.getAssignee() != null && bug.getAssignee().equalsIgnoreCase(assignee))
        .map(bug -> new BugResponseDTO(bug.getId(), bug.getTitle(), bug.getAssignee(), bug.getStatus(), bug.getProject()))
        .collect(Collectors.toList());
     }
     
     public List<BugResponseDTO> filterByProject(String project){
        return bugRepository.findAll().stream()
        .filter(bug -> bug.getProject() != null && bug.getProject().equalsIgnoreCase(project))
        .map(bug -> new BugResponseDTO(bug.getId(), bug.getTitle(), bug.getAssignee(), bug.getStatus(), bug.getProject()))
        .collect(Collectors.toList());
     }
     
     public List<BugResponseDTO> filterByTitle(String title){
        return bugRepository.findAll().stream()
        .filter(bug -> bug.getTitle().toLowerCase().contains(title.toLowerCase()))
        .map(bug -> new BugResponseDTO(bug.getId(), bug.getTitle(), bug.getAssignee(), bug.getStatus(), bug.getProject()))
        .collect(Collectors.toList());
     }
     

     public Page<BugResponseDTO> getAllBugs(Pageable pageable){
        return bugRepository.findAll(pageable)
        .map(bug -> new BugResponseDTO(bug.getId(), bug.getTitle(), bug.getAssignee(), bug.getStatus(), bug.getProject()));
     }

     public MetaData getMetaData(Pageable pageable){
       Page<Bug> page=bugRepository.findAll(pageable);
        return new MetaData(page.getNumber(), page.getSize(), page.getTotalElements(), page.getTotalPages(), page.getSort().toString(), page.isFirst(), page.isLast());
     }
     public List<BugResponseDTO> filterBugs(String status, String assignee, String project){
        return bugRepository.findAll().stream()
        .filter(bug -> status == null || bug.getStatus().equalsIgnoreCase(status))
        .filter(bug -> assignee == null || bug.getAssignee().equalsIgnoreCase(assignee))
        .filter(bug -> project == null || bug.getProject().equalsIgnoreCase(project))
        .map(bug -> new BugResponseDTO(bug.getId(), bug.getTitle(), bug.getAssignee(), bug.getStatus(), bug.getProject()))
        .collect(Collectors.toList());
     }

     public Page<BugResponseDTO> searchBug(String title,String status,String assignee,Pageable pageable){
        Page<Bug> page = bugRepository.findBug(title,status,assignee, pageable);
        return page.map(bug -> new BugResponseDTO(bug.getId(), bug.getTitle(), bug.getAssignee(), bug.getStatus(), bug.getProject()));
     }
    
     public Page<BugResponseDTO> changeIndexBugs(Pageable pageable){
        return bugRepository.findAll(pageable).map(bug -> new BugResponseDTO(bug.getId(), bug.getTitle(), bug.getAssignee(), bug.getStatus(), bug.getProject()));
     }

     public String createBug(Bug bug) {
        bugRepository.save(bug);
        return "Bug created successfully";
     }

     public String updateBug(Long id, Bug bug) {
        return bugRepository.findById(id)
            .map(existingBug -> {
                existingBug.setTitle(bug.getTitle());
                existingBug.setStatus(bug.getStatus());
                existingBug.setAssignee(bug.getAssignee());
                existingBug.setProject(bug.getProject());
                bugRepository.save(existingBug);
                return "Bug updated successfully";
            })
            .orElse("Bug not found");
     }

     public String updateBugStatus(Long id, String status) {
        return bugRepository.findById(id)
            .map(existingBug -> {
                existingBug.setStatus(status);
                bugRepository.save(existingBug);
                return "Bug status updated successfully";
            })
            .orElse("Bug not found");
     }

     public String deleteBug(Long id) {
        return bugRepository.findById(id)
            .map(bug -> {
                bugRepository.delete(bug);
                return "Bug deleted successfully";
            })
            .orElse("Bug not found");
     }

}