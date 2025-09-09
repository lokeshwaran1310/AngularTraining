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
			// Create default users with meaningful roles
			if (!userRepository.existsByUsername("manager")) {
				userRepository.save(new User("manager", "{noop}manager123", "MANAGER"));
			}
			if (!userRepository.existsByUsername("developer")) {
				userRepository.save(new User("developer", "{noop}dev123", "DEVELOPER"));
			}
			if (!userRepository.existsByUsername("tester")) {
				userRepository.save(new User("tester", "{noop}test123", "TESTER"));
			}
			bugRepository.save(new Bug(null,"Login page not loading","john.doe","Open","E-Commerce"));
			bugRepository.save(new Bug(null,"Payment gateway timeout","jane.smith","In Progress","E-Commerce"));
			bugRepository.save(new Bug(null,"Database connection error","mike.wilson","Resolved","CRM System"));
			bugRepository.save(new Bug(null,"UI alignment issues on mobile","sarah.johnson","Open","Mobile App"));
			bugRepository.save(new Bug(null,"Search functionality broken","david.brown","In Progress","E-Commerce"));
			bugRepository.save(new Bug(null,"Email notifications not sent","lisa.garcia","Closed","CRM System"));
			bugRepository.save(new Bug(null,"Performance issues on dashboard","tom.anderson","Open","Analytics"));
			bugRepository.save(new Bug(null,"File upload fails for large files","emma.davis","In Progress","Document Manager"));
			bugRepository.save(new Bug(null,"User authentication timeout","alex.martinez","Resolved","Mobile App"));
			bugRepository.save(new Bug(null,"Report generation crashes","chris.taylor","Open","Analytics"));
		};
	}

}
