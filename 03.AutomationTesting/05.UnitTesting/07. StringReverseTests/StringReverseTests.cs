using NUnit.Framework;

namespace TestApp.UnitTests;

public class StringReverseTests
{
    // TODO: finish test
    [Test]
    public void Test_Reverse_WhenGivenEmptyString_ReturnsEmptyString()
    {
        // Arrange
        string input = "";
        string  expected = string.Empty;

        // Act
        string result = StringReverse.Reverse(input);

        // Assert
        Assert.AreEqual(expected, result);
    }

    [Test]
    public void Test_Reverse_WhenGivenSingleCharacterString_ReturnsSameCharacter()
    {
        // Arrange
        string input = "666";
        string expected = "666";

        // Act
        string result = StringReverse.Reverse(input);

        // Assert
        Assert.AreEqual(expected, result);
    }

    [Test]
    public void Test_Reverse_WhenGivenNormalString_ReturnsReversedString()
    {
        // Arrange
        string input = "123";
        string expected = "321";

        // Act
        string result = StringReverse.Reverse(input);

        // Assert
        Assert.AreEqual(expected, result);
    }
}
