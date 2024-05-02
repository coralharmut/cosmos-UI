import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  private driverSchemas: Map<string, string> = new Map();

  constructor() { 

    this.driverSchemas.set('Driver A', `
      <Feature ID="OPTIONS">
        <Options>
          <Option Name="KEEPALIVE_INTERVAL" Description="Number of seconds for the TCP/IP KeepAlive interval time." Type="integer" Mandatory="false" DefaultValue="30" />
          <Option Name="EFLOW_TEST_SUFFIX" Description="Option allows to enter host codes in which a suffix will be added to differentiate between main and alternative results." Type="text" Mandatory="false" DefaultValue="" />
          <Option Name="CURRENT_TIMEZONE" Description="This option allows a timezone to be set." Type="text" Mandatory="false" DefaultValue="+1000" />
          <Option Name="RESULT_VALUE_WHEN_EMPTY" Description="This option allows setting a custom value for those empty result values that can be transmitted from the instrument to the cobas IT Solution." Type="text" DefaultValue="" Mandatory="false" />
          <Option Name="RESULT_VALUE_WHEN_SUPPRESSED" Description="This option allows setting a custom value for those suppressed result values that can be transmitted from the instrument to the cobas IT Solution." Type="text" DefaultValue="*******" Mandatory="false" />
          <Option Name="ENABLE_MODULE_MAPPING" Description="This option allows to map different modules into specified values. See Release Notes for value list." Mandatory="false" Type="boolean" DefaultValue="0" />
          <Option Name="AVOID_RAW_EFLOW" Description="This option allows to avoid RAW Eflow results from being mapped on Results." Mandatory="false" Type="boolean" DefaultValue="0" />
          <Option Name="DELIMITER_IN_SAMPLEID" Description="If the option is set, ASTM special characters won’t be escaped in Sample ID." Type="boolean" Mandatory="false" DefaultValue="0" />
          <Option Name="SAMPLE_PRIO" Description="When enabled, rack priority will be set following the next situations: R on Instrument and Application side: R. S on instrument and Application side: S. S on instrument, S. R on instrument and S on application: CS (Change to STAT)" Type="boolean" Mandatory="false" DefaultValue="0" />
          <Option Name="SAMPLEID_WHEN_QC" Description="SampleID content for QC results. Possible options: CTRLCODE; LOT; BOTTLE;" Mandatory="true" Type="select" DefaultValue="CTRLCODE">
            <Value Name="QC Control code" Value="CTRLCODE" />
            <Value Name="QC Control lot" Value="LOT" />
            <Value Name="QC Control bottle" Value="BOTTLE" />
            <Value Name="QC Control Name" Value="NAME" />
          </Option>
          <Option Name="SPECIMEN_TYPE_FOR_NONE_RACK" Description="Changes the specimen type value when no specimen is assigned (For None Rack)" Mandatory="true" Type="select" DefaultValue="DEFAULT">
            <Value Name="DEFAULT" Value="DEFAULT" />
            <Value Name="SERPLAS" Value="SERPLAS" />
            <Value Name="UR" Value="UR" />
            <Value Name="CSF" Value="CSF" />
            <Value Name="SUPN" Value="SUPN" />
            <Value Name="FLD" Value="FLD" />
            <Value Name="WB" Value="WB" />
            <Value Name="SAL" Value="SAL" />
            <Value Name="HEML" Value="HEML" />
            <Value Name="AMN" Value="AMN" />
            <Value Name="PROC_STL" Value="PROC_STL" />
            <Value Name="PLAS" Value="PLAS" />
            <Value Name="SER" Value="SER" />
            <Value Name="ORH" Value="ORH" />
          </Option>
          <Option Name="FORCE_P_ON_NEGATIVE_TESTREQUEST" Description="For Negative Query Replies, ORC-1 is ‘DC’, the driver will force the sending of a P value on SPM-11 field instead of an U." Mandatory="false" Type="boolean" DefaultValue="0" />
          <Option Name="SEND_CS_FOR_CHANGE_TO_STAT_PRIO" Description="For a change priority from standby to stat, sends CS (Change to Stat) instead of S. This option only applies from cobasproX instrument software version 1.5 onwards." Mandatory="false" Type="boolean" DefaultValue="0" />
          <Option Name="CONTROLNAME_FROM_INV" Description="If true, the driver takes the value of the ControlName from the INV segment instead of the SampleID" Mandatory="false" Type="boolean" DefaultValue="0" />
          <Option Name="SN_IN_MODULEID" Description="This option allows adding the Serial Number to the moduleID" Mandatory="false" Type="boolean" DefaultValue="0" />
          <Option Name="STATEMACHINE_STATUS" Description="This option allows to disabling the statemachine implementation" Mandatory="true" Type="select" DefaultValue="OFF">
            <Value Name="ON" Value="ON" />
            <Value Name="OFF" Value="OFF" />
          </Option>
        </Options>
      </Feature>
    `);
  }

  getDriverSchema(driverType: string): string | undefined {
    return this.driverSchemas.get(driverType);
  }
}
