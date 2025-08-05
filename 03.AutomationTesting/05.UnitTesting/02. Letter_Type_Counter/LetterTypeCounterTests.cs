using System;
using System.Linq;
using System.Text;
using NUnit.Framework;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using NUnit.Framework.Internal.Execution;
using System.Security.Cryptography;

namespace TestApp.Tests;

public class LetterTypeCounterTests
{
    [Test]
    public void Test_CountLetterTypes_EmptyString_ReturnEmptyDictionary()
    {
       

        //Arrange + Act
        Dictionary<string, int> result = LetterTypeCounter.CountLetterTypes(string.Empty);

        //Assert
        Assert.That(result, Is.Empty);


    }

    [Test]
    public void Test_CountLetterTypes_NonLetterString_ReturnNonLetterCountOnly()
    {
        // Arrange
        string input = "@!#";
        var expected = new Dictionary<string, int>
    {
        { "non-letter", 3 }
    };

        // Act
        var result = LetterTypeCounter.CountLetterTypes(input);

        // Assert
        CollectionAssert.AreEqual(expected, result);
    }

    [Test]
    public void Test_CountLetterTypes_NoOddLetterString_ReturnEvenAndNonLetterCount()
    {
        // Arrange
        string input = "BDF";
        var expected = new Dictionary<string, int>
            {
                { "even letter", 3 }
            };

        // Act
        var result = LetterTypeCounter.CountLetterTypes(input);

        // Assert
        CollectionAssert.AreEqual(expected, result);
    }

    [Test]
    public void Test_CountLetterTypes_NoEvenLetterString_ReturnOddAndNonLetterCount()
    {

        //Arrange
        string input = "A";


        Dictionary<string, int> expected = new Dictionary<string, int> {
            
            { "odd letter", 1 }
           
        };

        //Act
        Dictionary<string, int> result = LetterTypeCounter.CountLetterTypes(input);
        //Assert
        CollectionAssert.AreEqual(expected, result);
    }

    [Test]
    public void Test_CountLetterTypes_AllTypeOfLetterString_ReturnEvenOddAndNonLetterCount()
    {
        //Arrange
        string input = "123abc!";


        Dictionary<string, int> expected = new Dictionary<string, int> {
            { "even letter", 1 },
            { "odd letter", 2 },
            { "non-letter", 4 }

        };

        //Act
        Dictionary<string, int> result = LetterTypeCounter.CountLetterTypes(input);
        //Assert
        Assert.That(result, Is.EqualTo(expected));
    }
}