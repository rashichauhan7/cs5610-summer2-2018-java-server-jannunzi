package com.example.myapp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapp.model.Course;
import com.example.myapp.model.Lesson;
import com.example.myapp.model.Module;
import com.example.myapp.model.Topic;
import com.example.myapp.repository.CourseRepository;
import com.example.myapp.repository.LessonRepository;
import com.example.myapp.repository.ModuleRepository;
import com.example.myapp.repository.TopicRepository;
@RestController
@CrossOrigin
(origins = "*", maxAge = 3600)
public class TopicServices {

	 @Autowired
	    CourseRepository courseRepository;
	 @Autowired
	    ModuleRepository moduleRepository;
	 @Autowired
	 	LessonRepository lessonRepository;
	 @Autowired
	 	TopicRepository topicRepository;
	 

	    @PostMapping("/api/course/{courseId}/module/{moduleId}/lesson/{lessonId}/topic")
	    public Topic createTopic(@PathVariable("courseId") int courseId,@PathVariable("moduleId") int moduleId,@PathVariable("lessonId") int lessonId, @RequestBody Topic newTopic) {
	        Optional<Course> data = courseRepository.findById(courseId);
	        if(data.isPresent()) {
	            Optional<Module> mod = moduleRepository.findById(moduleId);
	            if(mod.isPresent())
	            	{
	            	 Optional<Lesson> les = lessonRepository.findById(lessonId);
	 	            if(les.isPresent())
	 	            	{
	 	            	Lesson lesson = les.get();
	 	            	newTopic.setLesson(lesson);
	 	            	return topicRepository.save(newTopic);
	            	}
	        }
	        }
	        return null;
	    }
	    @GetMapping("/api/course/{courseId}/module/{moduleId}/lesson/{lessonId}/topic")
	    public List<Topic> findAllLessonsForModule(
	            @PathVariable("courseId") int courseId,@PathVariable("moduleId") int moduleId,@PathVariable("lessonId") int lessonId) {
	       Optional<Lesson> les = lessonRepository.findById(lessonId);
	        if(les.isPresent()) {
	            Lesson lesson = les.get();
	            
	            return lesson.getTopic();
	        }
	        List<Topic> e = new ArrayList<Topic>();
	        return e;        
	    }
	    
	    @DeleteMapping("/api/topic/{topicId}")
		public void deleteTopic(@PathVariable("topicId") int topicId)
		{
			topicRepository.deleteById(topicId);
		}

}


