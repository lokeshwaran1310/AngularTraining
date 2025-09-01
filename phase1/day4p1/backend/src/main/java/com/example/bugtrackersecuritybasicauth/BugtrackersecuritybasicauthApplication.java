package com.example.bugtrackersecuritybasicauth;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.bugtrackersecuritybasicauth.entity.Bug;
import com.example.bugtrackersecuritybasicauth.entity.User;
import com.example.bugtrackersecuritybasicauth.repository.BugRepository;
import com.example.bugtrackersecuritybasicauth.repository.UserRepository;

@SpringBootApplication
public class BugtrackersecuritybasicauthApplication {

	public static void main(String[] args) {
		SpringApplication.run(BugtrackersecuritybasicauthApplication.class, args);
	}
	@Bean
	public CommandLineRunner commandLineRunner(BugRepository bugRepository, UserRepository userRepository){
		return args -> {
			// Create default users
			if (!userRepository.existsByUsername("admin")) {
				userRepository.save(new User("admin", "{noop}adminpassword", "ADMIN"));
			}
			if (!userRepository.existsByUsername("user")) {
				userRepository.save(new User("user", "{noop}userpassword", "USER"));
			}
			if (!userRepository.existsByUsername("developer")) {
				userRepository.save(new User("developer", "{noop}developerpassword", "DEVELOPER"));
			}
			bugRepository.save(new Bug(null,"Bug 1","Assignee 1","Status 1","proj1"));
			bugRepository.save(new Bug(null,"Bug 2","Assignee 2","Status 2","proj2"));
			bugRepository.save(new Bug(null,"Bug 3","Assignee 3","Status 3","proj3"));
			bugRepository.save(new Bug(null,"Bug 4","Assignee 4","Status 4","proj4"));
			bugRepository.save(new Bug(null,"Bug 5","Assignee 5","Status 5","proj5"));
			bugRepository.save(new Bug(null,"Bug 6","Assignee 6","Status 6","proj6"));
			bugRepository.save(new Bug(null,"Bug 7","Assignee 7","Status 7","proj7"));
			bugRepository.save(new Bug(null,"Bug 8","Assignee 8","Status 8","proj8"));
			bugRepository.save(new Bug(null,"Bug 9","Assignee 9","Status 9","proj9"));
			bugRepository.save(new Bug(null,"Bug 10","Assignee 10","Status 10","proj10"));
		};
	}

}
