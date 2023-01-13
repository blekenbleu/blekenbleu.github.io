using GameReaderCommon;
using SimHub.Plugins;
using System;
using System.Windows.Forms;
using System.Windows.Controls;
using System.Collections.Generic;

namespace User.PluginSdkDemo
{

    [PluginName("Demo plugin")]
    public class DataPluginDemo : IPlugin, IDataPlugin, IWPFSettings
    {
        private int SpeedWarningLevel = 100;


        /// <summary>
        /// Instance of the current plugin manager
        /// </summary>
        public PluginManager PluginManager { get; set; }


        private List<Opponent> frozenOpponents;
        /// <summary>
        /// called one time per game data update
        /// </summary>
        /// <param name="pluginManager"></param>
        /// <param name="data"></param>
        public void DataUpdate(PluginManager pluginManager, ref GameData data)
        {

            if (data.GameRunning && data.NewData != null)
            {
                if (frozenOpponents == null)
                {
                    frozenOpponents = data.NewData.Opponents;
                }
            }
            else
            {
                frozenOpponents = null;
            }

            for (int i = 0; i < 25; i++)
            {
                if (frozenOpponents!=null && frozenOpponents.Count > i)
                {
                    pluginManager.SetPropertyValue(string.Format("Opponent{0:00}Name", i), this.GetType(), frozenOpponents[i].Name);
                }
                else
                {
                    pluginManager.SetPropertyValue(string.Format("Opponent{0:00}Name", i), this.GetType(), null);
                }
            }
        }

        /// <summary>
        /// Called at plugin manager stop, close/displose anything needed here !
        /// </summary>
        /// <param name="pluginManager"></param>
        public void End(PluginManager pluginManager)
        {
        }

        /// <summary>
        /// Return you winform settings control here, return null if no settings control
        /// 
        /// </summary>
        /// <param name="pluginManager"></param>
        /// <returns></returns>
        public System.Windows.Forms.Control GetSettingsControl(PluginManager pluginManager)
        {
            return null;
        }

        public System.Windows.Controls.Control GetWPFSettingsControl(PluginManager pluginManager)
        {
            return new SettingsControlDemo();
        }

        /// <summary>
        /// Called after plugins startup
        /// </summary>
        /// <param name="pluginManager"></param>
        public void Init(PluginManager pluginManager)
        {
            for (int i = 0; i < 25; i++)
            {
                pluginManager.AddProperty(string.Format("Opponent{0:00}Name", i), this.GetType(), "");
            }


        }
    }
}