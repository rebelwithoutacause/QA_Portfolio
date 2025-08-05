using System;
using System.Text;
using System.Linq;
using NUnit.Framework;
using System.Collections.Generic;

namespace TestApp.Tests;

public class SentenceQualificatorTests
{
    [Test]
    public void Test_QualifySentence_EmptyString_ReturnsCorrectMessage()
    {
        //Arrange
        string input = string.Empty;
        string expected = "neutral";
        //Act
        string result = SentenceQualificator.QualifySentence(input);
        //Assert
        Assert.That(result, Is.EqualTo(expected));
    }

    [Test]
    public void Test_QualifySentence_WhitespacesString_ReturnsCorrectMessage()
    {
        //Arrange
        string input = "      ";
        string expected = "neutral";
        //Act
        string result = SentenceQualificator.QualifySentence(input);
        //Assert
        Assert.That(result, Is.EqualTo(expected));
    }

    [Test]
    public void Test_QualifySentence_EvenAsciiString_ReturnsCorrectMessage()
    {
        //Arrange
        string input = "001";
        string expected = "unlucky sentence";
        //Act
        string result = SentenceQualificator.QualifySentence(input);
        //Assert
        Assert.That(result, Is.EqualTo(expected));
    }

    [Test]
    public void Test_QualifySentence_OddAsciiString_ReturnsCorrectMessage()
    {
        //Arrange
        string input = "002";
        string expected = "lucky sentence";
        //Act
        string result = SentenceQualificator.QualifySentence(input);
        //Assert
        Assert.That(result, Is.EqualTo(expected));
    }
}   

