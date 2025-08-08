using NUnit.Framework;

namespace TestApp.UnitTests;

public class GradesTests
{
    [TestCase(2.5, "Fail")]
    [TestCase(3.2, "Average")]
    [TestCase(3.8, "Good")]
    [TestCase(4.2, "Very Good")]
    [TestCase(4.8, "Excellent")]
    [TestCase(1.9, "Invalid!")]
    [TestCase(5.1, "Invalid!")]
    public void Test_GradeAsWords_ReturnsCorrectString(double grade, string expected)
    {
        // Arrange

        // Act
        string actual = Grades.GradeAsWords(grade);

        // Assert
        Assert.AreEqual(expected, actual);
    }

    [TestCase(2.00, "Fail")]
    [TestCase(3.00, "Average")]
    [TestCase(3.50, "Good")]
    [TestCase(4.00, "Very Good")]
    [TestCase(4.50, "Excellent")]
    [TestCase(5.00, "Excellent")]
    public void Test_GradeAsWords_ReturnsCorrectString_EdgeCases(double grade, string expected)
    {
        // Arrange

        // Act
        string actual = Grades.GradeAsWords(grade);

        // Assert
        Assert.AreEqual(expected, actual);
    }
}
