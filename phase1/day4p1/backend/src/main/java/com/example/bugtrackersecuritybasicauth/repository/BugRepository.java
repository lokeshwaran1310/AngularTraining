package com.example.bugtrackersecuritybasicauth.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.bugtrackersecuritybasicauth.entity.Bug;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BugRepository extends JpaRepository<Bug, Long> {
    @Query("SELECT b FROM Bug b WHERE " +
           "(:title IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :title, '%'))) AND " +
           "(:status IS NULL OR LOWER(b.status) = LOWER(:status)) AND " +
           "(:assignee IS NULL OR LOWER(b.assignee) = LOWER(:assignee))")
    Page<Bug> findBug(@Param("title") String title, 
                      @Param("status") String status, 
                      @Param("assignee") String assignee, 
                      Pageable pageable);
}
