using System;
using System.Collections.Generic;

namespace TestApp;

public class DeliverySystem
{
    private List<string> deliveries;

    public int DeliveriesInProgressCount => deliveries.Count;

    public DeliverySystem()
    {
        this.deliveries = new List<string>();
    }
    public void AddDelivery(string item)
    {
        if (string.IsNullOrWhiteSpace(item))
        {
            throw new ArgumentException("Item info cannot be empty or whitespace.");
        }
        deliveries.Add(item);
    }

    public void FinishDelivery(string item)
    {
        if (!deliveries.Contains(item))
        {
            throw new ArgumentException("Item not found in the system.");
        }
        deliveries.Remove(item);
    }

    public List<string> GetAllDeliveriesInProgress()
    {
        return new List<string>(deliveries);
    }
}

