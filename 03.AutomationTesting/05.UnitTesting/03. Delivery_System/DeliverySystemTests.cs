using System;
using System.Text;
using System.Linq;
using NUnit.Framework;
using System.Collections.Generic;

namespace TestApp.Tests;

public class DeliverySystemTests
{
    [Test]
    public void Test_Constructor_CheckInitialEmptyDeliveryCollectionAndCount()
    {
        // Arrange & Act
        DeliverySystem system = new DeliverySystem();

        // Assert
        Assert.That(system.DeliveriesInProgressCount, Is.EqualTo(0));
        Assert.That(system.GetAllDeliveriesInProgress(), Is.Empty);

    }

    [Test]
    public void Test_AddDelivery_ValidItem_AddNewItemForDelivery()
    {
        var system = new DeliverySystem();
        system.AddDelivery("Fruits");
        system.AddDelivery("Vegetables");
        system.AddDelivery("Meat");

        Assert.That(system.DeliveriesInProgressCount, Is.EqualTo(3));
    }

    [Test]
    public void Test_AddDelivery_NullOrEmptyItem_ThrowsArgumentException()
    {
        var system = new DeliverySystem();
        
        Assert.Throws<ArgumentException>(() => system.AddDelivery(""));
        Assert.Throws<ArgumentException>(() => system.AddDelivery("   "));
        Assert.Throws<ArgumentException>(() => system.AddDelivery(null));


    }

    [Test]
    public void Test_FinishDelivery_ValidItem_RemoveExistingItemAsDelivered()
    {
        var system = new DeliverySystem();
        system.AddDelivery("Fruits");
        system.AddDelivery("Vegetables");
        system.AddDelivery("Meat");
        system.FinishDelivery("Meat");

        Assert.That(system.DeliveriesInProgressCount, Is.EqualTo(2));
    }

    [Test]
    public void Test_FinishDelivery_NullOrEmptyOrNonExistingItem_ThrowsArgumentException()
    {
        var system = new DeliverySystem();
      

        Assert.Throws<ArgumentException>(() => system.FinishDelivery("Invalid item"));
        Assert.Throws<ArgumentException>(() => system.FinishDelivery(null));
    }

    [Test]
    public void Test_GetAllDeliveriesInProgress_AddAndFinishDeliveries_ReturnExpectedDeliveryCollection()
    {
        //Arrange
        var system = new DeliverySystem();
        system.AddDelivery("Fruits");
        system.AddDelivery("Vegetables");
        system.AddDelivery("Meat");
        system.FinishDelivery("Meat");

        //Act

        var result = system.GetAllDeliveriesInProgress();

        Assert.That(system.DeliveriesInProgressCount, Is.EqualTo((2)));
    }
}

