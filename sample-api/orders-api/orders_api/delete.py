import boto3
import os
import json

def lambda_handler(message, context):

    if ('pathParameters' not in message or
            message['httpMethod'] != 'DELETE'):
        return {
            'statusCode': 400,
            'headers': {},
            'body': json.dumps({'msg': 'Bad Request'})
        }

    table_name = os.environ.get('ORDERS_TABLE')
    item_table = boto3.resource('dynamodb')

    table = item_table.Table(table_name)
    item_id =int( message['pathParameters']['id'])

    params = {
        'id': item_id
    }

    table.delete_item(
        Key=params,
    )
    return {
        'statusCode': 200,
        'headers': {"Access-Control-Allow-Headers" : 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'},
        'body': json.dumps({'msg': 'Items Deleted'})
    }