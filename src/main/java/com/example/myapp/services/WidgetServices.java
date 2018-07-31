package com.example.myapp.services;

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
import com.example.myapp.model.Module;
import com.example.myapp.model.Topic;
import com.example.myapp.model.Widget;
import com.example.myapp.repository.CourseRepository;
import com.example.myapp.repository.LessonRepository;
import com.example.myapp.repository.ModuleRepository;
import com.example.myapp.repository.TopicRepository;
import com.example.myapp.repository.WidgetRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class WidgetServices {
	@Autowired
	CourseRepository courseRepository;
	@Autowired
	ModuleRepository moduleRepository;
	@Autowired
	LessonRepository lessonRepository;
	@Autowired
	TopicRepository topicRepository;
	@Autowired
	WidgetRepository widgetRepository;

	@PostMapping("/api/topic/{topicId}/widget")
	public void createWidget (@PathVariable("topicId") int topicId,@RequestBody List<Widget> newwidget){
		Optional<Topic> data =
				topicRepository.findById(topicId);
		if(data.isPresent()) {
			Topic topic = data.get();
			List<Widget> widgets = topic.getWidgets();
			for(Widget w : widgets)
			widgetRepository.delete(w);
			for(Widget w: newwidget)
			{
				w.setTopic(topic);
				widgetRepository.save(w);
			}
		}
	}
	
	@GetMapping("/api/topic/{topicId}/widget")
	public List<Widget> findAllWidgetsForTopic(
			@PathVariable("topicId") int topicId) {
		Optional<Topic> data =
				topicRepository.findById(topicId);
		if(data.isPresent()) {
			Topic topic = data.get();
			return topic.getWidgets();
		}
		return null;        
	}


	

	@GetMapping("/api/widget")
	public List<Widget> findAllWidgets()
	{
		return (List<Widget>) widgetRepository.findAll();
	}
	
	
	@GetMapping("/api/widget/{widgetId}")
	public Widget getWidgetById(@PathVariable ("widgetId") int widgetId)
	{
		Optional<Widget> w = widgetRepository.findById(widgetId);
		return w.get();
	}
	
	@PutMapping("/api/widget/{widgetId}")
	public Widget updateWidget(@PathVariable ("widgetId") int widgetId, @RequestBody Widget newwidget)
	{
		Optional<Widget> w = widgetRepository.findById(widgetId);
		if(w.isPresent())
		{
			Widget widget = w.get();
			widget.setEdit(newwidget.isEdit());
			widget.setListItems(newwidget.getListItems());
			widget.setOrdered(newwidget.isOrdered());
			widget.setSize(newwidget.getSize());
			widget.setSrc(newwidget.getSrc());
			widget.setText(newwidget.getText());
			widget.setname(newwidget.getname());
			widget.setType(newwidget.getType());
			return widgetRepository.save(widget);
		}
		return null;
	}
	
	@DeleteMapping("/api/widget/{widgetId}")
	public void deleteWidget(
			@PathVariable("widgetId") int widgetId) {
		widgetRepository.deleteById(widgetId);
	}
	
}
