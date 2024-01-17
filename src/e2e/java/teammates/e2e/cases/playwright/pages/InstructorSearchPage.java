package teammates.e2e.cases.playwright.pages;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

import static org.junit.Assert.assertEquals;

import java.util.Map;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator.FilterOptions;

import teammates.common.datatransfer.attributes.CourseAttributes;
import teammates.common.datatransfer.attributes.StudentAttributes;
import teammates.common.util.StringHelper;

public class InstructorSearchPage extends BasePage {
  
  public InstructorSearchPage(Page page) {
    super(page);
  }

  public void search(String searchTerm) {
    Locator searchInput = page.locator("#search-keyword");
    Locator searchButton = page.locator("#btn-search");
    searchInput.clear();
    searchInput.fill(searchTerm);

    if (StringHelper.isEmpty(searchTerm)) {
      assertThat(searchButton).isDisabled();
      return;
    }

    searchButton.click();
  }

  public void verifyStudentDetails(Map<String, CourseAttributes> courses, Map<String, StudentAttributes[]> students) {
    assertEquals(students.size(), courses.size());
    assertThat(getStudentTables()).hasCount(courses.size());
    students.forEach((courseId, studentsForCourse) -> verifyStudentDetailsForCourse(courses.get(courseId), studentsForCourse));
  }


  public void verifyStudentDetailsForCourse(CourseAttributes course, StudentAttributes[] students) {
    for (StudentAttributes student : students) {
      Locator studentRow = getStudentRowForCourse(course, student);
      assertThat(studentRow.locator("td")).containsText(new String[] {student.getSection(), student.getTeam(), student.getName(), student.getGoogleId().isEmpty() ? "Yet to Join" : "Joined", student.getEmail()});
    }
  }

  private Locator getStudentTableForCourse(CourseAttributes course) {
    Locator studentTable = getStudentTables().filter(new FilterOptions().setHasText("[" + course.getId() + "]"));
    return studentTable;
  }

  private Locator getStudentRowForCourse(CourseAttributes course, StudentAttributes student) {
    Locator studentRow = getStudentTableForCourse(course).locator("tr").filter(new FilterOptions().setHasText(student.getEmail()));
    return studentRow;
  }

  private Locator getStudentTables() {
    return page.locator(".student-course-table");
  }

  public void clickViewStudent(CourseAttributes course, StudentAttributes student) {
    Locator studentRow = getStudentRowForCourse(course, student);
    studentRow.locator("[id^='btn-view-details-']").click();
  }

  public void clickEditStudent(CourseAttributes course, StudentAttributes student) {
    Locator studentRow = getStudentRowForCourse(course, student);
    studentRow.locator("[id^='btn-edit-details-']").click();
  }

  public void clickViewAllRecords(CourseAttributes course, StudentAttributes student) {
    Locator studentRow = getStudentRowForCourse(course, student);
    studentRow.locator("[id^='btn-view-records-']").click();
  }

  public void clickDeleteStudent(CourseAttributes course, StudentAttributes student) {
    Locator studentRow = getStudentRowForCourse(course, student);
    studentRow.locator("[id^='btn-delete-']").click();
    waitForConfirmationModalAndClickOk();
  }

}
