﻿//@CodeCopy
//MdStart
using System.ComponentModel;
using System.Windows;

namespace QTProjectTeam.WpfApp.ViewModels
{
    public abstract partial class BaseViewModel : INotifyPropertyChanged
    {
        #region fields
        public event PropertyChangedEventHandler? PropertyChanged;
        #endregion fields

        #region properties
        public Window? Window { get; set; }
        protected virtual void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
        #endregion properties
    }
}
//MdEnd
