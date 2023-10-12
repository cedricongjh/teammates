package teammates.e2e.cases.playwright.pages;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

import teammates.common.datatransfer.attributes.CourseAttributes;
import teammates.common.datatransfer.attributes.StudentAttributes;

public class InstructorCourseStudentDetailsEditPage extends BasePage {

  Locator courseId = page.locator("#course-id");
  Locator studentEmail = page.locator("#new-student-email");
  
  public InstructorCourseStudentDetailsEditPage(Page page) {
    super(page);
  }

  public void verifyIsCorrectPage(CourseAttributes course, StudentAttributes student) {
    assertThat(courseId).hasText(course.getId());
    assertThat(studentEmail).hasValue(student.getEmail());
  }
}
