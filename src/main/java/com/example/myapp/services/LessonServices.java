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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapp.model.Course;
import com.example.myapp.model.Lesson;
import com.example.myapp.model.Module;
import com.example.myapp.model.User;
import com.example.myapp.repository.CourseRepository;
import com.example.myapp.repository.LessonRepository;
import com.example.myapp.repository.ModuleRepository;
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class LessonServices {

	@Autowired
	CourseRepository courseRepository;
	@Autowired
	ModuleRepository moduleRepository;
	@Autowired
	LessonRepository lessonRepository;

	@GetMapping("/api/lesson")
	public Iterable<Lesson> findAllLessons() {
		return lessonRepository.findAll(); 
	}
	@PostMapping("/api/course/{courseId}/module/{moduleId}/lesson")
	public Lesson createLesson(@PathVariable("courseId") int courseId,@PathVariable("moduleId") int moduleId, @RequestBody Lesson newLesson) {
		Optional<Course> data = courseRepository.findById(courseId);
		if(data.isPresent()) {
			Optional<Module> mod = moduleRepository.findById(moduleId);
			if(mod.isPresent())
			{
				Module module = mod.get();
				newLesson.setModule(module);
				return lessonRepository.save(newLesson);
			}
		}
		return null;
	}
	@GetMapping("/api/course/{courseId}/module/{moduleId}/lesson")
	public List<Lesson> findAllLessonsForModule(
			@PathVariable("courseId") int courseId,@PathVariable("moduleId") int moduleId) {
		Optional<Module> mod = moduleRepository.findById(moduleId);
		if(mod.isPresent()) {
			Module module = mod.get();

			return module.getLessons();
		}
		List<Lesson> e = new ArrayList<Lesson>();
		return e;        
	}

	@DeleteMapping("/api/lesson/{lessonId}")
	public void deleteLesson(@PathVariable("lessonId") int lessonId)
	{
		lessonRepository.deleteById(lessonId);
	}

	@GetMapping("/api/lesson/{lessonId}")
	public Lesson findLessonById(@PathVariable("lessonId") int lessonId)
	{
		Optional<Lesson> data = lessonRepository.findById(lessonId);
		if(data.isPresent())
			return data.get();
		return null;
	}

	@PutMapping("/api/lesson/{lessonId}")
	public Lesson updateLesson(@PathVariable("lessonId") int lessonId, @RequestBody Lesson newLesson)
	{
		Optional<Lesson> data = lessonRepository.findById(lessonId);
		if(data.isPresent())
		{
			Lesson lesson = data.get();
			lesson.setTitle(newLesson.getTitle());
			return lessonRepository.save(lesson);

		}
		return null;
	}

}


