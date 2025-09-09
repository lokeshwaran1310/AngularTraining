package com.example.bugtrackersecuritybasicauth.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.bugtrackersecuritybasicauth.dto.BugResponseDTO;
import com.example.bugtrackersecuritybasicauth.dto.MetaData;
import com.example.bugtrackersecuritybasicauth.entity.Bug;
import com.example.bugtrackersecuritybasicauth.service.BugService;

@RestController
public class BugController {
    private final BugService bugService;
    public BugController(BugService bugService){
        this.bugService = bugService;
    }

    
    @GetMapping("/bugs/all")
    public ResponseEntity<List<BugResponseDTO>> getAllBugsWithoutFilter() {
        List<BugResponseDTO> bugs = bugService.getAllBugs();
        return ResponseEntity.ok(bugs);
    }
    
    @GetMapping("/bugs/status/{status}")
    public ResponseEntity<List<BugResponseDTO>> getBugsByStatus(@PathVariable String status) {
        List<BugResponseDTO> bugs = bugService.filterByStatus(status);
        return ResponseEntity.ok(bugs);
    }
    
    @GetMapping("/bugs/assignee/{assignee}")
    public ResponseEntity<List<BugResponseDTO>> getBugsByAssignee(@PathVariable String assignee) {
        List<BugResponseDTO> bugs = bugService.filterByAssignee(assignee);
        return ResponseEntity.ok(bugs);
    }
    
    @GetMapping("/bugs/project/{project}")
    public ResponseEntity<List<BugResponseDTO>> getBugsByProject(@PathVariable String project) {
        List<BugResponseDTO> bugs = bugService.filterByProject(project);
        return ResponseEntity.ok(bugs);
    }
    
    @GetMapping("/bugs/title/{title}")
    public ResponseEntity<List<BugResponseDTO>> getBugsByTitle(@PathVariable String title) {
        List<BugResponseDTO> bugs = bugService.filterByTitle(title);
        return ResponseEntity.ok(bugs);
    }
    @GetMapping("/bugs/page")
    public ResponseEntity<Page<BugResponseDTO>> getAllBugsPaginated(Pageable pageable) {
        Page<BugResponseDTO> bugs = bugService.getAllBugs(pageable);
        return ResponseEntity.ok(bugs);
    }
    @GetMapping("/bugs/metadata")
    public ResponseEntity<MetaData> getMetaInfo(Pageable pageable){
        return ResponseEntity.ok(bugService.getMetaData(pageable));
    }
    @GetMapping("/bugs/search")
    public ResponseEntity<Page<BugResponseDTO>> searchBug(@RequestParam(required = false) String title,
                                                          @RequestParam(required = false) String status,
                                                          @RequestParam(required = false) String assignee,
                                                          Pageable pageable){
        return ResponseEntity.ok(bugService.searchBug(title, status, assignee, pageable));
    }
    @GetMapping("/bugs/changedefaultindex")
    public ResponseEntity<Page<BugResponseDTO>> changeIndexBugs(@RequestParam(defaultValue = "1")int pageNumber,
                                                                @RequestParam(defaultValue = "10")int size){
        Pageable pageable=PageRequest.of(pageNumber-1, size);
        return ResponseEntity.ok(bugService.changeIndexBugs(pageable));
    }

    @PostMapping("/admin")
    public ResponseEntity<String> createBug(@RequestBody Bug bug) {
        return ResponseEntity.ok(bugService.createBug(bug));
    }
    @PutMapping("/admin/{id}")
    public ResponseEntity<String> updateBug(@PathVariable Long id, @RequestBody Bug bug) {
        return ResponseEntity.ok(bugService.updateBug(id, bug));
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<String> deleteBug(@PathVariable Long id) {
        return ResponseEntity.ok(bugService.deleteBug(id));
    }

    @PutMapping("/developer/status/{id}")
    public ResponseEntity<String> updateBugStatus(@PathVariable Long id, @RequestBody String status) {
        return ResponseEntity.ok(bugService.updateBugStatus(id, status));
    }
}
