package teammates.e2e.cases.playwright.pages;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

import com.microsoft.playwright.Page;

import teammates.common.util.AppUrl;
import teammates.common.util.TimeHelper;

public class BasePage {
    protected final Page page;

    public BasePage(Page page) {
        this.page = page;
    }

    public void navigateWithAppUrl(AppUrl url) {
        page.navigate(url.toAbsoluteString());
    }

    public static <T extends BasePage> T getNewPageInstance(Page page, Class<T> typeOfPage) {
        try{
            Constructor<T> constructor = typeOfPage.getConstructor(Page.class);
            T newPage = constructor.newInstance(page);
            return newPage;
        } catch (InvocationTargetException e) {
            if (e.getCause() instanceof IllegalStateException) {
                throw (IllegalStateException) e.getCause();
            }
            throw new RuntimeException(e);
        } catch (NoSuchMethodException | IllegalAccessException | InstantiationException e) {
            throw new RuntimeException(e);
        }
    }

    public String getDisplayedDateTime(Instant instant, String timeZone, String pattern) {
        ZonedDateTime zonedDateTime = TimeHelper.getMidnightAdjustedInstantBasedOnZone(instant, timeZone, false)
                .atZone(ZoneId.of(timeZone));
        return DateTimeFormatter.ofPattern(pattern).format(zonedDateTime);
    }
}
