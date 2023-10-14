package teammates.e2e.cases.playwright.pages;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator.FilterOptions;

public class InstructorStudentActivityLogsPage extends BasePage {
    private Locator activityTypeDropdown;

    private Locator studentNameDropDown;

    private Locator logsFromDatepicker;

    private Locator logsToDatepicker;

    private Locator logsFromTimepicker;

    private Locator logsToTimepicker;

    private Locator sessionDropdown;

    private Locator searchButton;

    private Locator logsOutput;
    
    public InstructorStudentActivityLogsPage(Page page) {
        super(page);
        activityTypeDropdown = page.locator("#activity-type-dropdown");
        studentNameDropDown = page.locator("#student-name-dropdown");
        logsFromDatepicker = page.locator("#logs-from-datepicker");
        logsToDatepicker = page.locator("#logs-to-datepicker");
        logsFromTimepicker = page.locator("#logs-from-timepicker");
        logsToTimepicker = page.locator("#logs-to-timepicker");
        sessionDropdown = page.locator("#session-dropdown");
        searchButton = page.locator("#search-button");
        logsOutput = page.locator("#logs-output");
    }

    public String getLogsFromDate() {
        return logsFromDatepicker.innerText();
    }

    public String getLogsToDate() {
        return logsToDatepicker.innerText();
    }

    public String getLogsFromTime() {
        return logsFromTimepicker.locator("select").locator("option:checked").innerText();
    }

    public String getLogsToTime() {
        return logsToTimepicker.locator("select").locator("option:checked").innerText();
    }

    public void setLogsFromDateTime(Instant instant, String timeZone) {
        setDateTime(logsFromDatepicker, logsFromTimepicker, instant, timeZone);
    }

    public void setLogsToDateTime(Instant instant, String timeZone) {
        setDateTime(logsToDatepicker, logsToTimepicker, instant, timeZone);
    }

    public void setActivityType(String activityType) {
        selectDropdownOptionByText(activityTypeDropdown, activityType);
    }

    public void search() {
        searchButton.click();
    }

    public void verifyLogPresentForSession(String sessionName, int numLogs) {
        assertThat(logsOutput).containsText(sessionName);

        Locator sessionLogSection = logsOutput.locator(".card").filter(new FilterOptions().setHasText(sessionName));
        sessionLogSection.locator(".card-body").locator("tr").highlight();
        assertThat(sessionLogSection.locator(".card-body").locator("tbody").locator("tr")).hasCount(numLogs);
    }

    private String getTimeString(Instant instant, String timeZone) {
        ZonedDateTime dateTime = instant.atZone(ZoneId.of(timeZone));
        if (dateTime.getHour() == 0) {
            return "23:59H";
        }
        return getDisplayedDateTime(instant, timeZone, "HH:00") + "H";
    }

    private void setDateTime(Locator dateBox, Locator timeBox, Instant startInstant, String timeZone) {
        fillDatePicker(dateBox, startInstant, timeZone);
        selectDropdownOptionByText(timeBox.locator("select"), getTimeString(startInstant, timeZone));
    }

}
